import { updateTask } from "@/store/slices/storeSlice";
import { RootState, updateType, useOptimisticUpdateType } from "@/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";

function useOptimisticUpdate() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.store);

  async function update(id: updateType) {
    console.log("update in process", id);
    dispatch(updateTask(id));
    try {
      await fetch(`api/routes/tasks/status/${id.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: id.newStatus }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }
  return { update };
}
export default useOptimisticUpdate;
