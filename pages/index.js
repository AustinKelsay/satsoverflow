import Header from "../src/components/Header/Header.component";
import Alert from "../src/components/Alert/Alert.component";
import RoutesTree from "../src/RoutesTree";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Alert />
      <RoutesTree />
    </div>
  );
}
