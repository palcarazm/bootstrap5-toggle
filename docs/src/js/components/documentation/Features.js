import DocSection from "./DocSection";
import AnimationSpeed from "./features/AnimationSpeed";
import Colors from "./features/Colors";
import CustomFormValue from "./features/CustomFormValue";
import CustomSize from "./features/CustomSize";
import CustomStyle from "./features/CustomStyle";
import CustomText from "./features/CustomText";
import CustomTitle from "./features/CustomTitle";
import FormLayout from "./features/FormLayout";
import KeyboardInteraction from "./features/KeyboardInteraction";
import OutlineColors from "./features/OutlineColors";
import Size from "./features/Size";
import StateStatus from "./features/StateStatus";
import Tooltip from "./features/Tooltip";
import Tristate from "./features/Tristate";

class Features extends DocSection {
  static build() {
    return super.build("features", "Features", [
      Size.build(),
      CustomSize.build(),
      Tristate.build(),
      Colors.build(),
      OutlineColors.build(),
      CustomText.build(),
      CustomTitle.build(),
      Tooltip.build(),
      CustomStyle.build(),
      AnimationSpeed.build(),
      KeyboardInteraction.build(),
      StateStatus.build(),
      CustomFormValue.build(),
      FormLayout.build(),
    ]);
  }
}

export default Features;
