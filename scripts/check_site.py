"""Dependency-free static integrity checks. Run: python3 scripts/check_site.py"""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import gzip
import sys

ROOT = Path(__file__).resolve().parents[1]

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images, self.meta, self.cards = [], [], [], [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag in ('a', 'link', 'script', 'img'):
            url = a.get('href', a.get('src'))
            if url:
                self.links.append(url)
        if tag == 'a' and a.get('target') == '_blank':
            assert {'noopener', 'noreferrer'} <= set(a.get('rel', '').split()), a
        if tag == 'img':
            self.images.append(a)
        if tag == 'meta':
            self.meta.append(a.get('name', a.get('property')))
        if tag == 'article' and 'project-card' in a.get('class', '').split():
            self.cards.append(a)

doc = Document()
doc.feed((ROOT / 'index.html').read_text())
assert not [x for x, count in Counter(doc.ids).items() if count > 1], 'Duplicate IDs'
assert len(doc.cards) == 5, 'Expected five project cards'
for url in doc.links:
    if url.startswith('#'):
        parts = url[1:].split('/')
        assert parts[0] in doc.ids, url
        if len(parts) > 1 and parts[0] == 'projects':
            assert 'project-' + parts[1] in doc.ids, url
        if len(parts) > 1 and parts[0] == 'skills':
            assert parts[1] in doc.ids, url
    elif not url.startswith(('http:', 'https:', 'mailto:', 'data:')):
        assert (ROOT / url.split('?')[0]).is_file(), url
for img in doc.images:
    assert 'alt' in img and 'width' in img and 'height' in img, img
assert {'description', 'viewport', 'og:title', 'og:description', 'og:image'} <= set(doc.meta)
assert (ROOT / 'Deeksha_Sinha_Resume.pdf').read_bytes().startswith(b'%PDF-')
code = b'\n'.join((ROOT / f).read_bytes() for f in ('index.html', 'styles.css', 'script.js', 'theme.js'))
compressed = len(gzip.compress(code))
assert compressed < 40000, 'Core site exceeded the 40 KB compressed budget'
assert not any('credly.com/badges/' in x and 'PLACEHOLDER' in x for x in doc.links)
print(f'PASS: unique IDs, routes, local assets, image dimensions, metadata, PDF, external-link isolation; {compressed:,} bytes compressed core code.')
