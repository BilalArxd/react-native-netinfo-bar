import NetInfo from "@react-native-community/netinfo";
import { InternetStatusContext } from "./InternetStatusContext";
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

export class InternetStatusProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      unsubscribe: null,
    };
  }

  componentDidMount() {
    this.setState({
      unsubscribe: NetInfo.addEventListener(this.internetStatusHandler),
    });
  }
  componentWillUnmount() {
    this.state.unsubscribe();
  }

  internetStatusHandler = (netInfo) => {
    this.setState({
      isConnected: netInfo.isConnected && netInfo.isInternetReachable,
    });
    this.showStatusMessages(this.state.isConnected);
    console.log(
      `InternetStatusHandler: Connection:${netInfo.isConnected}, Reachability: ${netInfo.isInternetReachable}`
    );
  };

  showStatusMessages = (isConnected) => {
    let message;
    if (isConnected) {
      message = "You have successfully connected to the internet.";
    } else {
      message = "No internet connection.";
    }
    console.log(`Message: ${message}`);
    // Toast.show({
    //   text: message,
    //   buttonText: "",
    //   type: "success",
    //   duration: 2000,
    // });
  };

  render() {
    return (
      <InternetStatusContext.Provider value={this.state.isConnected}>
        {this.props.children}
        {this.state.isConnected === false ? (
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}> No internet Connection. </Text>
          </View>
        ) : (
          <View style={styles.onlineContainer}>
            <Text style={styles.offlineText}> Internet Connected </Text>
          </View>
        )}
      </InternetStatusContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width,
    position: "absolute",
    alignSelf: "center",
  },
  onlineContainer: {
    backgroundColor: "#24b524",
    height: 30,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width,
    position: "absolute",
    alignSelf: "center",
  },
  offlineText: {
    color: "#fff",
  },
});
