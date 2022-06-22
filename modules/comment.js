import itemCount from './counter.js';
import renderError from './error.js';

// make comment
const makeComment = async (username, userComment, id) => {
  const baseUrl = 'https://api.tvmaze.com/shows/';

  try {
    username = username.value;
    userComment = userComment.value;
    if (username !== '' && userComment !== '') {
      const newComment = {
        item_id: id,
        username,
        comment: userComment
      };

      await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });
    }
    document.getElementById('username').value = '';
    document.getElementById('userComment').value = '';
  } catch (err) {
    renderError(err.message);
  }
};

// Show all comments
const showAllComments = async () => {
  const baseUrl = 'https://api.tvmaze.com/shows/comments?item_id=${showId}';

  let data;

  try {
    const request = await fetch(baseUrl);
    const response = await request.json();
    data = await response;
  } catch (err) {
    renderError(err.message);
  }
  return data;
};

const commentPopup = async (show) => {
  const modal = document.getElementById('myModal');
  const modalContent = document.getElementById('modal-content');
  const commentButton = document.createElement('button');
  const allComments = document.createElement('ul');
  const showId = show.idShow;
  const commentHeader = document.querySelector('.commentHeader');

  const showType = document.querySelector('#modal-content');
  showType.innerHTML += ` 
  <div class="showType">
    <img src=${show.image} alt=${show.title} />
    <h2 class="show-title">${show.title}</h2>
    <div class="show-details">
      <ul>
        <li>${Title}</li>
        <li>${Genres}</li>
        <li>${Language}</li>
        <li>${Status}</li>
        <li>${Runtime}</li>
        <li>${Priemer}</li>
      </ul>
    </div>
  
    <div class="comments">
      <h3 class="commentHeader"></h3>
      <ul class="allComments"></ul>
    </div>

    <form method="post" id="comment-form" class="comment-form">
      <h3 class="formHeader">Add a comment</h3>
      <input type="text" placeholder="Your name" id="name" />
      <textarea
        name="comment"
        id="msg"
        cols="60"
        rows="10"
        placeholder="Your insights..."
      ></textarea>
      <button type="submit" class="btn btn-primary">Comment</button>
    </form>
  </div>`;

  // make comments
  commentButton.addEventListener('click', () => {
    while (allComments.firstChild) {
      allComments.removeChild(allComments.lastChild);
    }
    makeComment(showId).then(() => {
      showAllComments(showId).then((data) => {
        commentHeader.innerHTML = `Comments (${itemCount(data)})`;
        data.forEach((insight) => {
          const li = document.createElement('li');
          li.append(
            `${insight.creation_date} ${insight.username} ${insight.comment}`
          );
          allComments.append(li);
        });
      });
    });
  });

  // showAllComments;

  showAllComments(showId).then((data) => {
    try {
      if (data.error) {
        commentHeader.innerHTML = `Comments (0)`;
        allComments.innerHtML = `No comments yet! Add comments`;
      } else {
        commentHeader.innerHTML = `Comments (${itemCount(data)})`;
        data.forEach((insight) => {
          const li = document.createElement('li');
          li.append(
            `${insight.creation_date} ${insight.username} ${insight.comment}`
          );
          allComments.append(li);
        });
      }
    } catch (err) {
      renderError(err.message);
    }
  });

  // close button
  document.getElementsByClassName('close')[0].addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.removeChild(showType);
  });

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      if (modalContent.hasChildNode) {
        modalContent.removeChild(showType);
      }
    }
  };
};

export default commentPopup;