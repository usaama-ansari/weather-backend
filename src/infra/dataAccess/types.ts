import { Document, UpdateQuery, QueryOptions, ProjectionFields, FilterQuery  } from "mongoose";

export type DbDocument<EntityProps> = Document & EntityProps;
export type DbUpdateQuery<EntityProps> = UpdateQuery<EntityProps>;
export type DbCreateQueryResult<EntityProps> = DbDocument<EntityProps>;
export type DbReadOneResult<EntityProps> = DbDocument<EntityProps>;
export type DbReadManyResult<EntityProps> = Array<DbDocument<EntityProps>>;
export type DbQueryOptions = QueryOptions;
export type DbQueryFilter<DocType> = FilterQuery<DocType>
export type DbQueryProjection<EntityProps> = ProjectionFields<EntityProps>
