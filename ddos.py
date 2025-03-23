import requests
import random
import time

# API Endpoint
BASE_URL = "http://localhost:3000"
POSTS_URL = f"{BASE_URL}/posts"

# Sample data
usernames = [f"spammer_bot_{random.randint(1, 1000)}" for _ in range(10)];
post_titles = ["Spammer", "Bot", "Spamming", "Posts", "Random", "Title", "Test", "Post", "Spam", "Spamming", "Spammer", "Bot", "Spamming", "Posts", "Random", "Title", "Test", "Post", "Spam", "Spamming"]
post_contents = ["just chilling", "having fun", "testing", "spamming", "posts", "random", "content", "spamming", "just chilling", "having fun", "testing", "spamming", "posts", "random", "content", "spamming"]

# Function to create a new post
i = 0
def create_post():
    global i
    post_data = {
        "Post[username]": random.choice(usernames),
        "Post[title]": random.choice(post_titles),
        "Post[content]": i,
    }
    response = requests.post(POSTS_URL, data=post_data)  # Send as form data
    
    if response.status_code in [200, 201]:
        print(f"✅ Post Created: {post_data}")
        i += 1
    else:
        print(f"❌ Failed to create post: {response.text}")

# Infinite loop to spam posts
while True:
    create_post()
    time.sleep(0.25)  # Sleep for 1 second
   
