import Methods from "./api/Methods";
import Options from "./api/Options";
import Rerender from "./api/Rerender";
import State from "./api/State";
import DocSection from "./DocSection";

class Api extends DocSection {
  static build() {
    return super.build("api", "API", [
      Options.build(),
      Methods.build(),
      State.build(),
      Rerender.build(),
    ]);
  }
}

export default Api;
