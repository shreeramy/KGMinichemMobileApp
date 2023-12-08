export default class Loader {
  static loader: any

  static setLoader = (loader: any) => {
    this.loader = loader
  }

  static isLoading = (check: Boolean) => {
    this.loader.showLoader(check)
  }
}
