---
layout: default
title: Blog
permalink: /blog/
---

# Blog

{% if site.posts.size == 0 %}
Nothing has been posted yet.
{% else %}
<ul class="post-list">
{% for post in site.posts %}
<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a><span class="post-date">{{ post.date | date: "%-d %B %Y" }}</span></li>
{% endfor %}
</ul>
{% endif %}
