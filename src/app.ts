import app from "./index";
import './scripts/NotificationCronJobService/index';
const defaultPortNumber = 8443;
const port = Number(process.env.PORT || defaultPortNumber);

app.listen(port, () => {
  console.log(`App listening on port ${port}......`);
});