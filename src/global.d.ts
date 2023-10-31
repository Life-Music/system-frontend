
declare type layout = "AuthLayout" | "DefaultLayout"

declare interface ResponseSuccess<T> {
  success: true,
  data: T
}

declare interface ResponseFailed {
  success?: false,
  error: string
}

declare interface AxiosResponse<T> extends ResponseSuccess<T>, ResponseFailed {

}

