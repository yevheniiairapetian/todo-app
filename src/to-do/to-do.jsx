import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
export const ToDo = ({ arr }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar />
        <ListItemText primary={arr.item.todo} secondary={arr.item.todo} />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.7 }}
        onClick={() => {
          deleteDoc(doc(db, "todos", arr.id));
        }}
      />
    </List>
  );
};
