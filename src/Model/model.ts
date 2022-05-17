// Describes the User task.
export type UserTask = {
    // The unique identifier of the task
    id: string;
    // Name of the task
    name: string;
    // Task Definition ID (node BPMN id) of the process
    taskDefinitionId: string;
    // Name of the process
    processName: string;
    // When was the task created
    creationTime: string;
    // When was the task completed
    completionTime: string;
    // Username/id of who is assigned to the task
    assignee: string;
    // Variables associated to the task
    variables: [Variable];
    // State of the task
    taskState: TaskState;
    // Array of values to be copied into `TaskQuery` to request for next or previous page of tasks.
    sortValues: [string];
    // Flag to show that the task is first in current filter
    isFirst: boolean;
    // Reference to the task form
    formKey: string;
    //Reference to process definition
    processDefinitionId: string;
    //Candidate groups
    candidateGroups: [string];
};

//Describes task embedded form
type Form = {
    //The unique identifier of the embedded form within one process
    id: string;
    //Reference to process definition
    processDefinitionId: string;
    //Form content
    schema: string;
}

//Task query - query to get one page of tasks.
type TaskQuery = {
    // State of the tasks
    state: TaskState;
    // Are the tasks assigned?
    assigned: boolean;
    // Who is assigned to the tasks?
    assignee: string;
    // given group is in candidate groups list
    candidateGroup: string;
    //Size of tasks page (default: 50).
    pageSize: number;
    // Task definition ID - what's the BPMN flow node?
    taskDefinitionId: string
    //Array of values copied from `sortValues` of one of the tasks, query will return page of tasks going directly after this values plus same sort values.
    searchAfter: [string]
    //Array of values copied from `sortValues` of one of the tasks, query will return page of tasks going directly after this values.
    searchAfterOrEqual: [string]
    //Array of values copied from `sortValues` of one of the tasks, query will return page of tasks going directly before this values plus same sort values.
    searchBefore: [string]
    //Array of values copied from `sortValues` of one of the tasks, query will return page of tasks going directly before this values.
    searchBeforeOrEqual: [string]
}
// State of the task.
enum TaskState {
    CREATED,
    COMPLETED,
    CANCELED
}
// Variable used in task.
type Variable = {
    id: string;
    name: string
    // full variable value
    value: string
    // value preview (limited in size)
    previewValue: string
    // shows, whether previewValue contains truncated value or full value
    isValueTruncated: boolean
}
// Change or add a variable with name and value.
type VariableInput = {
    name: string;
    value: string;
};
// Describes the user.
type User  = {
    userId: string;
    displayName: string
    permissions: [string]
}
// What can be searched for.
type Query = {
    // Get list of tasks based on `TaskQuery`.
    tasks(query: TaskQuery): [UserTask];
    // Get one task by id. Returns task or error when task does not exist.
    task(id: string): UserTask
    // Get currently logged in user.
    currentUser: User
    // Get task form by id and processDefinitionId
    form(id: string, processDefinitionId: string): Form
    // Get a collection of Variables by name
    variables(taskId: string, variableNames: [string]): [Variable]
    // Get the variables by variable id
    variable(id: string): Variable
}
// What can be changed.
type Mutation = {
    // Complete a task with taskId and optional variables. Returns the task.
    completeTask(taskId: string, variables: [VariableInput]): UserTask
    // Claim a task with taskId to currently logged in user. Returns the task.
    claimTask(taskId: string, assignee: string): UserTask
    // Unclaim a task with taskId. Returns the task.
	unclaimTask(taskId: string): UserTask
    // Delete process instance by given processInstanceId. Returns true if process instance could be deleted.
    deleteProcessInstance(processInstanceId: string): boolean
}