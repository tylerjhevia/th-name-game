import * as React from "react";
import { PersonContainer } from "./PersonContainer";

export interface AppProps {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class App extends React.Component<AppProps, {}> {
  render() {
    return <PersonContainer />;
  }
}
