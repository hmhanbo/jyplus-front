/**
 * Created by chuck7 on 16/7/30.
 */

//
// export const postList = ({post}) => {
//   return post.all;
// }
// export const articleIdOfPost =({post}) => {
//   return post.articleId;
// }
// export const currentPostId = ({post}) => {
//   return post.currentPostId;
// }
// export const currentPostIndex = ({post}) => {
//   return post.currentPostIndex;
// }
// export const postTitle = ({post}) => {
//   return post.title;
// }
// export const postSaved = ({post}) => {
//   return post.postSaved;
// }
// export const postTitleSaved = ({post}) => {
//   return post.postTitleSaved;
// }

const getters = {
    postList: ({post}) => {
      return post.all;
    },
    articleIdOfPost :({post}) => {
      return post.articleId;
    },
    currentPostId :({post}) => {
      return post.currentPostId;
    },
    currentPostIndex :({post}) => {
      return post.currentPostIndex;
    },
    postTitle :({post}) => {
      return post.title;
    },
    postSaved :({post}) => {
      return post.postSaved;
    },
    postTitleSaved :({post}) => {
      return post.postTitleSaved;
    }
};

export default getters
