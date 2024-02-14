export default class Loader {
  static loader: any

  static setLoader = (loader: any) => {
    this.loader = loader
  }

  static isLoading = (check: Boolean) => {
    if (this.loader && this.loader.showLoader) {
      this.loader.showLoader(check)
    } else {
      console.error('Loader is not properly initialized.')
    }
  }
}
