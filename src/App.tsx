import { AttendeeList } from "./Components/Attendee-List/Attendee-List";
import { Header } from "./Components/Header/Header";

function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <AttendeeList />
    </div>
  );
}

export default App
