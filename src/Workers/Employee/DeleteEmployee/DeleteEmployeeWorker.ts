import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { NotifyAdministrationDeptExternalTask } from "./Task/NotifyAdministrationDept";
import { NotifyItDeptExternalTask } from "./Task/NotifyITDept";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  subManager.subscribeToTopic(
    "delete-employee-notify-it-dept",
    new NotifyItDeptExternalTask()
  );

  subManager.subscribeToTopic(
    "delete-employee-notify-admin-dept",
    new NotifyAdministrationDeptExternalTask()
  );
}
