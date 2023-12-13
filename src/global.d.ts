
declare type layout = "AuthLayout" | "DefaultLayout"

declare interface ResponseSuccess<T> {
  success: true,
  data: T
}

declare interface ResponseFailed {
  success?: false,
  error: string
}

declare interface ResponseSuccessPagination<T> extends ResponseSuccess<T> {
  meta: {
    total_object: number,
    current_page: number,
    per_page: number,
    end_page: number,
  }
}

declare interface AxiosResponse<T> extends ResponseSuccess<T>, ResponseFailed {

}

