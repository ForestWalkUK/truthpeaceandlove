---
layout: page
title: Blog
tag: blog
permalink: /blog/
---

{% if site.posts.size == 0 %}
Nothing has been posted yet.
{% else %}
<ul class="list-big post-list">
{% for post in site.posts %}
<li><a href="{{ post.url | relative_url }}"><span class="list-title">{{ post.title }}</span><span class="post-date">{{ post.date | date: "%-d %B %Y" }}</span></a></li>
{% endfor %}
</ul>
{% endif %}
