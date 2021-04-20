import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from './fetcher';
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

export enum Gametype {
  Livecoding = 'LIVECODING',
  Multiplechoice = 'MULTIPLECHOICE',
  Fillinblank = 'FILLINBLANK',
  Matching = 'MATCHING',
  Spotthebug = 'SPOTTHEBUG'
}

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
  levels: Array<LevelObject>;
  stages: Array<StageObject>;
  questions: Array<QuestionObject>;
  roadmap: Array<RoadmapObject>;
  _id: Scalars['ObjectId'];
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
  title: Scalars['String'];
  description: Scalars['String'];
  _id: Scalars['ObjectId'];
};

export type LevelInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type LevelObject = {
  title: Scalars['String'];
  description: Scalars['String'];
  _id: Scalars['ObjectId'];
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
  updateRoadmap: Array<RoadmapObject>;
  updateLevels: Array<LevelObject>;
  createLevel: LevelObject;
  createQuestion: QuestionObject;
  createStage: StageObject;
  updateQuestions: Array<QuestionObject>;
  updateStages: Array<StageObject>;
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
  codingLanguage?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
};


export type MutationUpdateGameArgs = {
  gameId: Scalars['ObjectId'];
  newCodingLanguage?: Maybe<Scalars['String']>;
  newTitle?: Maybe<Scalars['String']>;
  newDifficulty?: Maybe<Scalars['String']>;
  newTags?: Maybe<Array<Scalars['String']>>;
  newDescription?: Maybe<Scalars['String']>;
};


export type MutationUpdateRoadmapArgs = {
  gameId: Scalars['String'];
  roadmap: Array<RoadmapInput>;
};


export type MutationUpdateLevelsArgs = {
  gameId: Scalars['String'];
  levelsToUpdate: Array<Level>;
};


export type MutationCreateLevelArgs = {
  gameId: Scalars['String'];
  level: LevelInput;
};


export type MutationCreateQuestionArgs = {
  gameId: Scalars['String'];
  question: QuestionInput;
};


export type MutationCreateStageArgs = {
  gameId: Scalars['String'];
  stage: StageInput;
};


export type MutationUpdateQuestionsArgs = {
  gameId: Scalars['String'];
  questionsToUpdate: Array<Question>;
};


export type MutationUpdateStagesArgs = {
  gameId: Scalars['String'];
  stagesToUpdate: Array<Stage>;
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
  getLevel: LevelObject;
  getStage: StageObject;
  getQuestion: QuestionObject;
  getRoadmap: Array<RoadmapObject>;
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
  title: Scalars['String'];
  description: Scalars['String'];
  timeLimit: Scalars['Int'];
  points: Scalars['Int'];
  lives: Scalars['Int'];
  hints: Array<HintInput>;
  gameType: Gametype;
  toAnswer: Scalars['String'];
  exampleSolutionCode: Scalars['String'];
  exampleSolutionDescription: Scalars['String'];
  correctChoice: Scalars['String'];
  incorrectChoices: Array<Scalars['String']>;
  matchings: Array<MatchingInput>;
  _id: Scalars['ObjectId'];
};

export type QuestionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  timeLimit: Scalars['Int'];
  points: Scalars['Int'];
  lives: Scalars['Int'];
  hints: Array<HintInput>;
  gameType: Gametype;
  toAnswer: Scalars['String'];
  exampleSolutionCode: Scalars['String'];
  exampleSolutionDescription: Scalars['String'];
  correctChoice: Scalars['String'];
  incorrectChoices: Array<Scalars['String']>;
  matchings: Array<MatchingInput>;
};

export type QuestionObject = {
  title: Scalars['String'];
  description: Scalars['String'];
  timeLimit: Scalars['Int'];
  points: Scalars['Int'];
  lives: Scalars['Int'];
  hints: Array<Hint>;
  gameType: Gametype;
  toAnswer: Scalars['String'];
  exampleSolutionCode: Scalars['String'];
  exampleSolutionDescription: Scalars['String'];
  correctChoice: Scalars['String'];
  incorrectChoices: Array<Scalars['String']>;
  matchings: Array<Matching>;
  _id: Scalars['ObjectId'];
};

export type QuestionProgress = {
  questionId: Scalars['String'];
  completed: Scalars['Boolean'];
  livesLeft: Scalars['Int'];
  pointsReceived: Scalars['Int'];
};

export type RoadmapInput = {
  parent?: Maybe<Scalars['ObjectId']>;
  sequence: Scalars['Int'];
  kind: Scalars['String'];
  refId: Scalars['String'];
};

export type RoadmapObject = {
  parent?: Maybe<Scalars['ObjectId']>;
  sequence: Scalars['Int'];
  kind: Scalars['String'];
  refId: Scalars['String'];
  _id: Scalars['ObjectId'];
};

export enum Sort_Options {
  Rating = 'RATING',
  Newest = 'NEWEST',
  PlayCount = 'PLAY_COUNT'
}

export type Stage = {
  title: Scalars['String'];
  description: Scalars['String'];
  _id: Scalars['ObjectId'];
};

export type StageInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type StageObject = {
  title: Scalars['String'];
  description: Scalars['String'];
  _id: Scalars['ObjectId'];
};

export type StageProgress = {
  stageId: Scalars['String'];
  completed: Scalars['Boolean'];
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

export type CreateGameMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  codingLanguage?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateGameMutation = { createGame: Pick<Game, '_id'> };

export type UpdateGameMutationVariables = Exact<{
  gameId: Scalars['ObjectId'];
  newTitle?: Maybe<Scalars['String']>;
  newCodingLanguage?: Maybe<Scalars['String']>;
  newDifficulty?: Maybe<Scalars['String']>;
  newDescription?: Maybe<Scalars['String']>;
  newTags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdateGameMutation = { updateGame: Pick<Game, '_id'> };

export type UpdateQuestionMutationVariables = Exact<{
  gameId: Scalars['String'];
  questionsToUpdate: Array<Question> | Question;
}>;


export type UpdateQuestionMutation = { updateQuestions: Array<Pick<QuestionObject, '_id'>> };

export type GetGameEditQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetGameEditQuery = { getGame?: Maybe<(
    Pick<Game, '_id' | 'createdBy' | 'title' | 'description' | 'codingLanguage' | 'difficulty' | 'tags'>
    & { roadmap: Array<Pick<RoadmapObject, '_id' | 'parent' | 'sequence' | 'kind' | 'refId'>>, levels: Array<Pick<LevelObject, '_id' | 'title' | 'description'>>, stages: Array<Pick<StageObject, '_id' | 'title' | 'description'>>, questions: Array<(
      Pick<QuestionObject, '_id' | 'title' | 'description' | 'timeLimit' | 'points' | 'lives' | 'gameType' | 'toAnswer' | 'exampleSolutionCode' | 'exampleSolutionDescription' | 'correctChoice' | 'incorrectChoices'>
      & { hints: Array<Pick<Hint, '_id' | 'description' | 'timeToReveal'>>, matchings: Array<Pick<Matching, '_id' | 'pairOne' | 'pairTwo'>> }
    )> }
  )> };

export type ContextGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ContextGetMeQuery = { getMe?: Maybe<(
    Pick<User, '_id' | 'email' | 'name' | 'roles' | 'username'>
    & { profilePicture: Pick<ProfilePicture, 'avatar' | 'large'> }
  )> };

export type GetSearchResultsQueryVariables = Exact<{
  query: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
}>;


export type GetSearchResultsQuery = { getSearch: (
    Pick<PaginatedGameResponse, 'hasMore' | 'nextCursor'>
    & { nodes: Array<Pick<Game, 'title' | 'rating' | 'createdBy' | 'tags' | 'codingLanguage' | 'difficulty' | 'description' | 'playCount'>> }
  ) };


export const CreateGameDocument = `
    mutation createGame($title: String, $codingLanguage: String, $difficulty: String, $description: String, $tags: [String!]) {
  createGame(
    title: $title
    codingLanguage: $codingLanguage
    difficulty: $difficulty
    description: $description
    tags: $tags
  ) {
    _id
  }
}
    `;
export const useCreateGameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGameMutation, TError, CreateGameMutationVariables, TContext>) => 
    useMutation<CreateGameMutation, TError, CreateGameMutationVariables, TContext>(
      (variables?: CreateGameMutationVariables) => fetcher<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, variables)(),
      options
    );
export const UpdateGameDocument = `
    mutation updateGame($gameId: ObjectId!, $newTitle: String, $newCodingLanguage: String, $newDifficulty: String, $newDescription: String, $newTags: [String!]) {
  updateGame(
    gameId: $gameId
    newTitle: $newTitle
    newCodingLanguage: $newCodingLanguage
    newDifficulty: $newDifficulty
    newDescription: $newDescription
    newTags: $newTags
  ) {
    _id
  }
}
    `;
export const useUpdateGameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateGameMutation, TError, UpdateGameMutationVariables, TContext>) => 
    useMutation<UpdateGameMutation, TError, UpdateGameMutationVariables, TContext>(
      (variables?: UpdateGameMutationVariables) => fetcher<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, variables)(),
      options
    );
export const UpdateQuestionDocument = `
    mutation updateQuestion($gameId: String!, $questionsToUpdate: [Question!]!) {
  updateQuestions(gameId: $gameId, questionsToUpdate: $questionsToUpdate) {
    _id
  }
}
    `;
export const useUpdateQuestionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateQuestionMutation, TError, UpdateQuestionMutationVariables, TContext>) => 
    useMutation<UpdateQuestionMutation, TError, UpdateQuestionMutationVariables, TContext>(
      (variables?: UpdateQuestionMutationVariables) => fetcher<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, variables)(),
      options
    );
export const GetGameEditDocument = `
    query GetGameEdit($id: String!) {
  getGame(id: $id) {
    _id
    createdBy
    roadmap {
      _id
      parent
      sequence
      kind
      refId
    }
    title
    description
    levels {
      _id
      title
      description
    }
    stages {
      _id
      title
      description
    }
    codingLanguage
    difficulty
    tags
    questions {
      _id
      title
      description
      timeLimit
      points
      lives
      hints {
        _id
        description
        timeToReveal
      }
      gameType
      toAnswer
      exampleSolutionCode
      exampleSolutionDescription
      correctChoice
      incorrectChoices
      matchings {
        _id
        pairOne
        pairTwo
      }
    }
  }
}
    `;
export const useGetGameEditQuery = <
      TData = GetGameEditQuery,
      TError = unknown
    >(
      variables: GetGameEditQueryVariables, 
      options?: UseQueryOptions<GetGameEditQuery, TError, TData>
    ) => 
    useQuery<GetGameEditQuery, TError, TData>(
      ['GetGameEdit', variables],
      fetcher<GetGameEditQuery, GetGameEditQueryVariables>(GetGameEditDocument, variables),
      options
    );
useGetGameEditQuery.getKey = (variables: GetGameEditQueryVariables) => ['GetGameEdit', variables];

export const ContextGetMeDocument = `
    query ContextGetMe {
  getMe {
    _id
    email
    name
    profilePicture {
      avatar
      large
    }
    roles
    username
  }
}
    `;
export const useContextGetMeQuery = <
      TData = ContextGetMeQuery,
      TError = unknown
    >(
      variables?: ContextGetMeQueryVariables, 
      options?: UseQueryOptions<ContextGetMeQuery, TError, TData>
    ) => 
    useQuery<ContextGetMeQuery, TError, TData>(
      ['ContextGetMe', variables],
      fetcher<ContextGetMeQuery, ContextGetMeQueryVariables>(ContextGetMeDocument, variables),
      options
    );
useContextGetMeQuery.getKey = (variables?: ContextGetMeQueryVariables) => ['ContextGetMe', variables];

export const GetSearchResultsDocument = `
    query GetSearchResults($query: String!, $cursor: String, $amount: Int) {
  getSearch(query: $query, cursor: $cursor, amount: $amount) {
    hasMore
    nextCursor
    nodes {
      title
      rating
      createdBy
      tags
      title
      codingLanguage
      difficulty
      description
      playCount
    }
  }
}
    `;
export const useGetSearchResultsQuery = <
      TData = GetSearchResultsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsQueryVariables, 
      options?: UseQueryOptions<GetSearchResultsQuery, TError, TData>
    ) => 
    useQuery<GetSearchResultsQuery, TError, TData>(
      ['GetSearchResults', variables],
      fetcher<GetSearchResultsQuery, GetSearchResultsQueryVariables>(GetSearchResultsDocument, variables),
      options
    );
useGetSearchResultsQuery.getKey = (variables: GetSearchResultsQueryVariables) => ['GetSearchResults', variables];
