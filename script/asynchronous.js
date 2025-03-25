/**
 To populate the forum leaderboard with data, you will need to request the data from an API. This is known as an asynchronous operation, which means that tasks execute independently of the main program flow.
You can use the async keyword to create an asynchronous function, which returns a promise.
Example Code
const example = async () => {
  console.log("this is an example");
};
The try block is designed to handle potential errors, and the code inside the catch block will be executed in case an error occurs.
Example Code
try {
  const name = "freeCodeCamp";
  name = "fCC";
} catch (err) {
  console.log(err); // TypeError: Assignment to constant variable.
}
In the previous project, you used fetch() with the .then() method to perform logic after the promise was resolved. Now you will use the await keyword to handle the asynchronous nature of the fetch() method.
The await keyword waits for a promise to resolve and returns the result.
Example Code
const example = async () => {
  const data = await fetch("https://example.com/api");
  console.log(data);
}
To display data in the Activity column, you need to use the bumped_at property of each topic, which is a timestamp in the ISO 8601 format. You need to process this data before you can show how much time has passed since a topic had any activity.
Create a new timeAgo function with a time parameter.
Inside your timeAgo function, create two variables named currentTime and lastPost and set them to new Date() and new Date(time) respectively.
lastPost will be the date of the last activity on a topic, and currentTime represents the current date and time.
 */


const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

const forumCategory = (id) => {
  let selectedCategory = {};

  if (allCategories.hasOwnProperty(id)) {
    const { className, category } = allCategories[id];

    selectedCategory.className = className;
    selectedCategory.category = category;
  } else {
    selectedCategory.className = "general";
    selectedCategory.category = "General";
    selectedCategory.id = 1;
  }
  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
  const linkText = selectedCategory.category;
  const linkClass = `category ${selectedCategory.className}`;

  return `<a href="${url}" class="${linkClass}" target="_blank">
    ${linkText}
  </a>`;
};

const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);

  const timeDifference = currentTime - lastPost;
  const msPerMinute = 1000 * 60;

  const minutesAgo = Math.floor(timeDifference / msPerMinute);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }

  return `${daysAgo}d ago`;
};

const viewCount = (views) => {
  const thousands = Math.floor(views / 1000);

  if (views >= 1000) {
    return `${thousands}k`;
  }

  return views;
};

const avatars = (posters, users) => {
  return posters
    .map((poster) => {
      const user = users.find((user) => user.id === poster.user_id);
      if (user) {
        const avatar = user.avatar_template.replace(/{size}/, 30);
        const userAvatarUrl = avatar.startsWith("/user_avatar/")
          ? avatarUrl.concat(avatar)
          : avatar;
        return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
      }
    })
    .join("");
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();

const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;

  postsContainer.innerHTML = topics.map((item) => {
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at,
    } = item;

    return `
    <tr>
      <td>
        <a target="_blank" href="${forumTopicUrl}${slug}/${id}" class="post-title">${title}</a>

        ${forumCategory(category_id)}
      </td>
      <td>
        <div class="avatar-container">
          ${avatars(posters, users)}
        </div>
      </td>
      <td>${posts_count - 1}</td>
      <td>${viewCount(views)}</td>
      <td>${timeAgo(bumped_at)}</td>
    </tr>`;
  }).join("");
};

