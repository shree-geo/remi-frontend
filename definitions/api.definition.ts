export class IListResponse<T> {
  constructor(data: IListResponse<T>) {
    Object.assign(this, data);
  }
  code!: number;
  data!: {
    results: T[];
    next: string | null;
    previous: string | null;
    count: number;
  };
  message!: string;
  error!: IResponseError | null;
}

export class IResponse<T> {
  constructor(data: IResponse<T>) {
    Object.assign(this, data);
  }
  code!: number;
  data!: T;
  message!: string;
  error!: IResponseError | null;
}

export class IResponseError {
  constructor(data: IResponseError) {
    Object.assign(this, data);
  }
  detail?: string;
  non_field_errors?: string[];
  [key: string]: string | string[] | undefined;
}
