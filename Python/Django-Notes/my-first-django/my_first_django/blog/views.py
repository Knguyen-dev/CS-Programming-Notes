from django.shortcuts import render
from .models import Post # import Post so we can get posts from the database

'''
Views: These will be the functions that render markup, render page content, or run 
    when a user goes on a specific url route in our website. Will always return an 
    http response or an exception.

- Using templates: 
    1. When specifying path in 'render()'. Specify subdirectory of root 'templates', 
    so in this case, we're using 'blog'
    2. Pass in data to a template for yourself to use by creating a dictionary
        such as 'context'. Assign key to a value you want to access in html file.
        Then pass context dictionary as third argument to render. Now in the 
        html file you listed for that render function, you can use 'someKey', and 
        Django will know to substitute it with the real data value of someDataValue.

        context = {
            "someKey": someDataValue
        }
    3. Then you can write python code inside the django html 
        files

'''


# Create your views here.
def home(request):
    context = {
        "posts": Post.objects.all(),
    }
    return render(request, "blog/home.html", context)

def about(request):
    return render(request, "blog/about.html", context={"title": "About You!"})