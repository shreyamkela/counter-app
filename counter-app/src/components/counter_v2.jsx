// There are 4 counter components inside 1 counters component. The counter components are fully controlled by the counters component and there is no local state in the counter components. The counter components are 'controlled' components - no local state. A controlled component receives all the data via props and raises events when ever any data needs to be changed. The controller component handles these events and sends the data via props.
// For previous version refer counter_v1

import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a. For eg, in the object { key: value } if key and value variables have the same name then it can be just written as { key }

class Counter extends Component {
  // lifecycle hooks
  componentDidUpdate(prevProps, prevState) {
    // This lifecycle hook is called when a component is updated. This hook is called after componentWillUnmount
    // We can use this method to compare whether any props of the component has been changed or not after the update. If no change then no need to make AJAX call. If change then make AJAX call.
    // This is done as below:
    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);
    // if (prevProps.counter.value !== this.props.counter.value) {
    //   // Ajax call and get new data from server
    // } // Else, no ajax call
  }
  // lifecycle hooks
  componentWillUnmount() {
    // this method is called just before a component is removed from the dom - fore eg. before a counter component is removed when delete is clicked. This hook is called before componentDidUpdate
    // That is this is called just before the component is removed from the actual dom. Thus we can use this method to clean up, for eg. any timers or listeners that we had put up for this component being removed, otherwise it can cause memory leaks.
    console.log("Counter - Unmount");
  }

  render() {
    // On chrome developer tools we can see what is being changed with each render. It would show that only this below div is changing.
    //console.log("props", this.props); // All react components have a JS property called props and here it contains all the attributes set by the counters component
    console.log("Counter - Rendered");

    return (
      <div>
        {/* <h4>{this.props.children}</h4> This is how we pass a children of a property i.e children props, from the counters component into the counter component*/}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)} // onIncrement raises the event and handleIncrement in Counter component handles this event by changing the data and sending that data this this counter component, as a prop. Using (this.props.counter) passes a reference of the current counter object. Using references to instances of the component make the event handlers simple. This is similar to what we did with onDelete event
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          Decrement
        </button>
        <button
          // onClick={this.props.onDelete}
          onClick={() => {
            this.props.onDelete(this.props.counter.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* NOTE In React -  The component that owns a piece of the state, should be the one modifying it. Therefore we cannot have a counter_v1 component deleting itself from the state of counters (when we want to delete a counter component from counters). Thus we have to include the delete logic into counters itself. Different counters are listed in the state of counters class and if we want to remove any then delete logic should also be in the counters class only  */}
        {/*We have used onDelete={this.handleDelete} in Counters class, to register an event handler prop that passes a reference to this.handleDelete so that counter object can refer to this method of the counters class. We could not have added handleDelete method in counter class itself as handleDelete manipulates the state of counters class and the component that owns a piece of the state, should be the one modifying it. Now in counter class, we can reference this method for the current object and use this event handler for the deletion of that particular counter object. This is raising and handling of events. Counter class will raise an event and Counters class will handle that event. Counters class provides the handleDelete method which can be instantiated by counter object for the current object and can be used to delete the object.*/}
        {/* Thus onClick will make a reference or instantiate the handleDelete method of Counters class for this object as onDelete has been   as a prop in Counters class */}
        {/* We us the arrow function this.props.onDelete(this.props.counter.id) so as to pass the id of the counter object that we want to delete, to the Counters object */}
      </div>
    );
  }

  getBadgeClasses() {
    // Passing functions into jsx
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value <= 0 ? "warning" : "primary"; //  Appending this CSS to the classes variable depending on the count. If not zero, colour is blue, else it is zero and yellow/warning colour
    return classes;
  }

  formatCount() {
    // Passing functions into jsx
    const { value: count } = this.props.counter;
    return count <= 0 ? "Zero" : count;
  }
}

export default Counter;
