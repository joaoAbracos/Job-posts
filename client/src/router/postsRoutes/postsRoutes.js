import MyPostsPage from "../../pages/posts/MyPostPage.vue";
import PostJob from "../../pages/posts/PostJob.vue";
export default [
  {
    path: "/posts",
    name: "myPosts",
    component: MyPostsPage,
    meta: {
      auth: true,
    },
  },
  {
    path: "/post",
    component: PostJob,
    name: "post",
    meta: {
      auth: true,
    },
  }
];
