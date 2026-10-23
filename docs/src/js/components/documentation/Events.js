import DocSection from "./DocSection";
import CustomEvents from "./events/CustomEvents";
import EventPropagation from "./events/EventPropagation";
import LifecycleEvents from "./events/LifecycleEvents";
import ChainableSubscription from "./events/ChainableSubscription";
import SilencedActions from "./events/SilencedActions";

class Events extends DocSection {
    static build() {
        return super.build("events", "Events", [
            EventPropagation.build(),
            CustomEvents.build(),
            LifecycleEvents.build(),
            ChainableSubscription.build(),
            SilencedActions.build(),
        ]);
    }
}

export default Events;
