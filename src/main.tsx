import { BasicGameServer } from "devvit-hub";

const server = new BasicGameServer("My Chat app");

server.onPostCreated = async (post) => {
  console.log("Post created", post);
  await server.setInterval(`update-${post.postId}`, 1000);
};

export default server.build();
