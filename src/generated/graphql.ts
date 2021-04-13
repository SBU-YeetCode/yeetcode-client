export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date Type for GraphQL */
  Date: any;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Comment = {
  gameId: Scalars['String'];
  userId: Scalars['String'];
  review: Scalars['String'];
  rating: Scalars['Int'];
  _id: Scalars['ObjectId'];
  dateCreated: Scalars['Date'];
  lastUpdated: Scalars['Date'];
  userInfo: User;
};

export type CommentInput = {
  gameId: Scalars['String'];
  userId: Scalars['String'];
  review: Scalars['String'];
  rating: Scalars['Int'];
};


export type Deleted = {
  success: Scalars['Boolean'];
  err?: Maybe<Scalars['String']>;
  amountDeleted: Scalars['Int'];
};

export type Game = {
  createdBy: Scalars['String'];
  dateCreated: Scalars['Date'];
  lastUpdated: Scalars['Date'];
  commentCount: Scalars['Int'];
  totalStars: Scalars['Int'];
  rating: Scalars['Float'];
  playCount: Scalars['Int'];
  commentsRef: Array<Scalars['String']>;
  codingLanguage: Scalars['String'];
  title: Scalars['String'];
  difficulty: Scalars['String'];
  tags: Array<Scalars['String']>;
  description: Scalars['String'];
  levels: Array<Level>;
  stages: Array<Stage>;
  questions: Array<Question>;
  roadmap: Array<SubGameRoadmap>;
  _id: Scalars['ObjectId'];
};

export type GameInput = {
  createdBy: Scalars['String'];
  dateCreated: Scalars['Date'];
  lastUpdated: Scalars['Date'];
  commentCount: Scalars['Int'];
  totalStars: Scalars['Int'];
  rating: Scalars['Float'];
  playCount: Scalars['Int'];
  commentsRef: Array<Scalars['String']>;
  codingLanguage: Scalars['String'];
  title: Scalars['String'];
  difficulty: Scalars['String'];
  tags: Array<Scalars['String']>;
  description: Scalars['String'];
  levels: Array<LevelInput>;
  stages: Array<StageInput>;
  questions: Array<QuestionInput>;
  roadmap: Array<SubGameRoadmapInput>;
};

export type GameProgress = {
  userId: Scalars['String'];
  gameId: Scalars['String'];
  completedAt?: Maybe<Scalars['Date']>;
  isCompleted: Scalars['Boolean'];
  levels?: Maybe<Array<LevelProgress>>;
  stages?: Maybe<Array<StageProgress>>;
  questions?: Maybe<Array<QuestionProgress>>;
  totalPoints: Scalars['Int'];
  codingLanguage: Scalars['String'];
  _id: Scalars['ObjectId'];
  startedAt: Scalars['Date'];
  game: Game;
};

export type Hint = {
  _id: Scalars['ObjectId'];
  description: Scalars['String'];
  timeToReveal: Scalars['Int'];
};

export type HintInput = {
  _id: Scalars['ObjectId'];
  description: Scalars['String'];
  timeToReveal: Scalars['Int'];
};

export enum Languages {
  C = 'C',
  Cpp = 'CPP',
  Javascript = 'JAVASCRIPT',
  Java = 'JAVA',
  Python = 'PYTHON'
}

export type Level = {
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type LevelInput = {
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type LevelProgress = {
  levelId: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type Matching = {
  _id: Scalars['ObjectId'];
  pairOne: Scalars['String'];
  pairTwo: Scalars['String'];
};

export type MatchingInput = {
  _id: Scalars['ObjectId'];
  pairOne: Scalars['String'];
  pairTwo: Scalars['String'];
};

export type Mutation = {
  createUser: User;
  updateUser: User;
  deleteUser: Deleted;
  createComment: Comment;
  createGameProgress: GameProgress;
  deleteGameProgress: Deleted;
  createGame: Game;
  updateGame: Game;
  updateLevels: Array<Level>;
  updateQuestions: Array<Question>;
  updateStages: Array<Stage>;
  deleteGame: Deleted;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ObjectId'];
  newName?: Maybe<Scalars['String']>;
  newUsername?: Maybe<Scalars['String']>;
  newAvatar?: Maybe<Scalars['String']>;
  newLargePicture?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ObjectId'];
};


export type MutationCreateCommentArgs = {
  comment: CommentInput;
  userId: Scalars['ObjectId'];
};


export type MutationCreateGameProgressArgs = {
  userId: Scalars['ObjectId'];
  gameId: Scalars['String'];
};


export type MutationDeleteGameProgressArgs = {
  userId: Scalars['ObjectId'];
  gameProgressId: Scalars['String'];
};


export type MutationCreateGameArgs = {
  game: GameInput;
};


export type MutationUpdateGameArgs = {
  gameId: Scalars['ObjectId'];
  newCodingLanguage?: Maybe<Scalars['String']>;
  newTitle?: Maybe<Scalars['String']>;
  newDifficulty?: Maybe<Scalars['String']>;
  newTags?: Maybe<Array<Scalars['String']>>;
  newDescription?: Maybe<Scalars['String']>;
};


export type MutationUpdateLevelsArgs = {
  gameId: Scalars['String'];
  levelsToUpdate: Array<LevelInput>;
};


export type MutationUpdateQuestionsArgs = {
  gameId: Scalars['String'];
  questionsToUpdate: Array<QuestionInput>;
};


export type MutationUpdateStagesArgs = {
  gameId: Scalars['String'];
  stagesToUpdate: Array<StageInput>;
};


export type MutationDeleteGameArgs = {
  userId: Scalars['ObjectId'];
  gameId: Scalars['String'];
};


export type PaginatedCommentResponse = {
  nodes: Array<Comment>;
  hasMore: Scalars['Boolean'];
  nextCursor?: Maybe<Scalars['String']>;
};

export type PaginatedGameResponse = {
  nodes: Array<Game>;
  hasMore: Scalars['Boolean'];
  nextCursor?: Maybe<Scalars['String']>;
};

export type PaginatedUserResponse = {
  nodes: Array<User>;
  hasMore: Scalars['Boolean'];
  nextCursor?: Maybe<Scalars['String']>;
};

export type Points = {
  total: Scalars['Int'];
  javascript: Scalars['Int'];
  python: Scalars['Int'];
  c: Scalars['Int'];
  cpp: Scalars['Int'];
  java: Scalars['Int'];
};

export type PointsInput = {
  total: Scalars['Int'];
  javascript: Scalars['Int'];
  python: Scalars['Int'];
  c: Scalars['Int'];
  cpp: Scalars['Int'];
  java: Scalars['Int'];
};

export type ProfilePicture = {
  avatar: Scalars['String'];
  large: Scalars['String'];
};

export type ProfilePictureInput = {
  avatar: Scalars['String'];
  large: Scalars['String'];
};

export type Query = {
  getMe?: Maybe<User>;
  getUser?: Maybe<User>;
  getLeaderboard: PaginatedUserResponse;
  getComment?: Maybe<Comment>;
  getGameComments: PaginatedCommentResponse;
  getUserReviews: Array<Comment>;
  getGameProgress?: Maybe<GameProgress>;
  getUserCompletedGames: Array<GameProgress>;
  getUserRecentGames: Array<GameProgress>;
  getGame?: Maybe<Game>;
  getFilterGames: PaginatedGameResponse;
  getSearch: PaginatedGameResponse;
  getUserCreatedGames: Array<Game>;
  getLevel: Level;
  getStage: Stage;
  getQuestion: Question;
  getRoadmap: Array<SubGameRoadmap>;
};


export type QueryGetUserArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetLeaderboardArgs = {
  amount?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  language?: Maybe<Languages>;
};


export type QueryGetCommentArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetGameCommentsArgs = {
  gameId: Scalars['String'];
  amount?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type QueryGetUserReviewsArgs = {
  userId: Scalars['String'];
};


export type QueryGetGameProgressArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetUserCompletedGamesArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserRecentGamesArgs = {
  userId: Scalars['String'];
};


export type QueryGetGameArgs = {
  id: Scalars['String'];
};


export type QueryGetFilterGamesArgs = {
  amount?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  sortDir?: Maybe<Scalars['Int']>;
  language?: Maybe<Languages>;
  sort?: Maybe<Sort_Options>;
};


export type QueryGetSearchArgs = {
  amount?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  query: Scalars['String'];
};


export type QueryGetUserCreatedGamesArgs = {
  userId: Scalars['String'];
};


export type QueryGetLevelArgs = {
  gameId: Scalars['String'];
  levelId: Scalars['String'];
};


export type QueryGetStageArgs = {
  gameId: Scalars['String'];
  stageId: Scalars['String'];
};


export type QueryGetQuestionArgs = {
  gameId: Scalars['String'];
  questionId: Scalars['String'];
};


export type QueryGetRoadmapArgs = {
  gameId: Scalars['String'];
};

export type Question = {
  _id: Scalars['ObjectId'];
  sequence: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  timeLimit: Scalars['Int'];
  points: Scalars['Int'];
  lives: Scalars['Int'];
  hints: Array<Hint>;
  gameType: Scalars['String'];
  toAnswer: Scalars['String'];
  exampleSolutionCode: Scalars['String'];
  exampleSolutionDescription: Scalars['String'];
  correctChoice: Scalars['String'];
  incorrectChoices: Array<Scalars['String']>;
  matchings: Array<Matching>;
};

export type QuestionInput = {
  _id: Scalars['ObjectId'];
  sequence: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  timeLimit: Scalars['Int'];
  points: Scalars['Int'];
  lives: Scalars['Int'];
  hints: Array<HintInput>;
  gameType: Scalars['String'];
  toAnswer: Scalars['String'];
  exampleSolutionCode: Scalars['String'];
  exampleSolutionDescription: Scalars['String'];
  correctChoice: Scalars['String'];
  incorrectChoices: Array<Scalars['String']>;
  matchings: Array<MatchingInput>;
};

export type QuestionProgress = {
  questionId: Scalars['String'];
  completed: Scalars['Boolean'];
  livesLeft: Scalars['Int'];
  pointsReceived: Scalars['Int'];
};

export enum Sort_Options {
  Rating = 'RATING',
  Newest = 'NEWEST',
  PlayCount = 'PLAY_COUNT'
}

export type Stage = {
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type StageInput = {
  _id: Scalars['ObjectId'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type StageProgress = {
  stageId: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type SubGameRoadmap = {
  _id: Scalars['ObjectId'];
  refId: Scalars['String'];
  sequence: Scalars['String'];
  kind: Scalars['String'];
};

export type SubGameRoadmapInput = {
  _id: Scalars['ObjectId'];
  refId: Scalars['String'];
  sequence: Scalars['String'];
  kind: Scalars['String'];
};

export type User = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  points: Points;
  profilePicture: ProfilePicture;
  lastUpdated: Scalars['Date'];
  roles: Array<Scalars['String']>;
  comments: Array<Comment>;
  gamesRecent: Array<GameProgress>;
  gamesCompleted: Array<GameProgress>;
  gamesCreated: Array<Game>;
};

export type UserInput = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  points: PointsInput;
  profilePicture: ProfilePictureInput;
  lastUpdated: Scalars['Date'];
  roles: Array<Scalars['String']>;
};
