import { port, app } from '../app/main';

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
