export type User = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  sceneId: string;
  userId: string;
  userName: string;
  text: string;
  ts: number;
};

export type LikesState = {
  likesCountByScene: Record<string, number>;
  likedByUser: Record<string, Record<string, boolean>>;
};



