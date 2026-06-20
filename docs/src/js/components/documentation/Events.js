import DocSection from "./DocSection";
import CustomEvents from "./events/CustomEvents";
import EventPropagation from "./events/EventPropagation";
import SilencedActions from "./events/SilencedActions";

class Events extends DocSection {
  static build() {
    return super.build("events", "Events", [
      EventPropagation.build(),
      CustomEvents.build(),
      SilencedActions.build(),
    ]);
  }
}

export default Events;
