const apiEndpointComments = "https://project-1-api.herokuapp.com/comments";

async function fetchComments() {
  try {
    const response = await fetch(`${apiEndpointComments}?api_key=b83a46b8-2ac6-458f-8e07-0a9a6b982ab4`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments data");
    }
    const commentsData = await response.json();
    renderComments(commentsData);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

function renderComments(comments) {
  const commentsList = document.querySelector(".comments__list");
  commentsList.innerHTML = ""; 
  comments
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.className = "comments__list-item";

      const name = document.createElement("p");
      name.className = "comments__list-item-name";
      name.textContent = `${comment.name}`;
      const date = document.createElement("span");
      date.className = "comments__list-item-date";
      date.textContent = ` ${new Date(comment.timestamp).toLocaleDateString()}`;
      name.appendChild(date);

      const text = document.createElement("p");
      text.className = "comments__list-item-text";
      text.textContent = comment.comment;

      commentItem.append(name, text);
      commentsList.appendChild(commentItem);
    });
}

async function addComment(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");

  try {
    const response = await fetch(`${apiEndpointComments}?api_key=b83a46b8-2ac6-458f-8e07-0a9a6b982ab4`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        comment: commentInput.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    const newComment = await response.json();
    renderComments([newComment, ...document.querySelectorAll(".comments__list-item")]);
    nameInput.value = "";
    commentInput.value = "";
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}

document.querySelector(".comments__form").addEventListener("submit", addComment);

fetchComments();
