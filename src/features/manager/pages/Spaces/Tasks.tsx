import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useManagerTasksByManagerIdQuery } from "@/queries/managers/tasks/useManagerTasksByManagerIdQuery";
import { useManagerTasksBySpaceIdQuery } from "@/queries/managers/tasks/useManagerTasksBySpaceIdQuery";
import { RootState } from "@/redux/store/appStore";

import { ManagerCreateTasks } from "../../components/ManagerCreateTasks";
import { ManagerViewTasks } from "../../components/ManagerViewTasks";

export default function Tasks() {
  const manager = useSelector((state: RootState) => state.manager);
  const { spaceid } = useParams();
  const { data: createdtasks } = useManagerTasksByManagerIdQuery(manager.id);
  const { data: alltasks } = useManagerTasksBySpaceIdQuery("" + spaceid);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your project tasks
          </p>
        </div>
        <div className="mt-4 md:mt-0"></div>
      </div>

      <Tabs defaultValue="all_tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all_tasks">All tasks</TabsTrigger>
          <TabsTrigger value="created_tasks">Created</TabsTrigger>
          <TabsTrigger value="add_tasks">Add Task</TabsTrigger>
        </TabsList>

        <TabsContent value="add_tasks">
          <ManagerCreateTasks />
        </TabsContent>
        <TabsContent value="created_tasks">
          <ManagerViewTasks tasks={createdtasks!} />
        </TabsContent>
        <TabsContent value="all_tasks">
          <ManagerViewTasks tasks={alltasks!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
