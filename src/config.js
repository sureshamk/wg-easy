'use strict';

const { release } = require('./package.json');

require('dotenv').config();

console.log(process.env); // remove this after you've confirmed it is working

module.exports.RELEASE = release;
module.exports.PORT = process.env.PORT || 51821;
module.exports.PASSWORD = process.env.PASSWORD;
module.exports.WG_PATH = process.env.WG_PATH || '/etc/wireguard/';
module.exports.WG_HOST = process.env.WG_HOST || '0.0.0.0';
module.exports.WG_PORT = process.env.WG_PORT || 51820;
module.exports.WG_MTU = process.env.WG_MTU || null;
module.exports.WG_PERSISTENT_KEEPALIVE = process.env.WG_PERSISTENT_KEEPALIVE || 0;
module.exports.WG_DISABLE_PRESHAREDKEY = process.env.WG_DISABLE_PRESHAREDKEY === '1';
module.exports.WG_DISABLE_ADDRESS_IPV4 = process.env.WG_DISABLE_ADDRESS_IPV4 === '1';
module.exports.WG_DEFAULT_ADDRESS_IPV4 = process.env.WG_DEFAULT_ADDRESS_IPV4 || '10.8.0.x';
module.exports.WG_DEFAULT_ADDRESS_IPV6 = process.env.WG_DEFAULT_ADDRESS_IPV6 || 'fd42:42:42::x';
module.exports.WG_DEFAULT_DNS = typeof process.env.WG_DEFAULT_DNS === 'string'
  ? process.env.WG_DEFAULT_DNS
  : '1.1.1.1';
module.exports.WG_ALLOWED_IPS = process.env.WG_ALLOWED_IPS || '0.0.0.0/0, ::/0';

module.exports.WG_PRE_UP = process.env.WG_PRE_UP || '';
module.exports.WG_POST_UP = process.env.WG_POST_UP || `
iptables -t nat -A POSTROUTING -s ${module.exports.WG_DEFAULT_ADDRESS_IPV4.replace('x', '0')}/32 -o eth0 -j MASQUERADE;
iptables -A INPUT -p udp -m udp --dport 51820 -j ACCEPT;
iptables -A FORWARD -i wg0 -j ACCEPT;
iptables -A FORWARD -o wg0 -j ACCEPT;
ip6tables -t nat -A POSTROUTING -s ${module.exports.WG_DEFAULT_ADDRESS_IPV6.replace('x', '0')}/128 -o eth0 -j MASQUERADE;
ip6tables -A INPUT -p udp -m udp --dport 51820 -j ACCEPT;
ip6tables -A FORWARD -i wg0 -j ACCEPT;
ip6tables -A FORWARD -o wg0 -j ACCEPT;
`.split('\n').join(' ');

module.exports.WG_PRE_DOWN = process.env.WG_PRE_DOWN || '';
module.exports.WG_POST_DOWN = process.env.WG_POST_DOWN || '';
module.exports.WG_COMMANDS = process.env.WG_COMMANDS || '';
