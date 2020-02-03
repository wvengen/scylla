import json
import re

from requests_html import HTML

from scylla.database import ProxyIP
from .base_provider import BaseProvider


class CoolProxyProvider(BaseProvider):

    def parse(self, html: HTML) -> [ProxyIP]:
        ip_list: [ProxyIP] = []
        text = html.raw_html.decode('utf-8')
        obj = json.loads(text)

        for ip_row in obj:

            p = ProxyIP(ip=ip_row['ip'], port=ip_row['port'], is_anonymous=ip_row['anonymous'])
            ip_list.append(p)
        return ip_list

    def urls(self) -> [str]:
        return [
            'https://cool-proxy.net/proxies.json',
        ]

    @staticmethod
    def should_render_js() -> bool:
        return False
