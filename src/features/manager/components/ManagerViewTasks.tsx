import { CheckCircle, ArrowUpCircle, Calendar } from "lucide-react";
import React, { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskType } from "@/types";

import { EditTaskDialog } from "./EditTaskDialogue";
type Props = { tasks: TaskType[] };

export const ManagerViewTasks: React.FC<Props> = ({ tasks }) => {
  const [editTask, setEditTask] = React.useState<TaskType | null>(null);
  const [canShow, setCanShow] = useState(false);

  const closeHandler = () => {
    setCanShow(false);
    setEditTask(null);
  };
  return tasks?.length === 0 ? (
    <div className="flex flex-col items-center justify-center text-center p-12">
      <div className="rounded-full bg-muted p-4 mb-4">
        <CheckCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No tasks yet</h3>
    </div>
  ) : (
    <>
      <EditTaskDialog
        task={editTask}
        canShow={canShow}
        closeHandler={closeHandler}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.length &&
          tasks?.map((task) => (
            <Card key={task._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <CardTitle className="text-lg ml-2">{task.name}</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditTask(task);
                      setCanShow(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-4">{task.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {task?.tags &&
                    task?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                </div>

                {task.assignee && task.assignee.length > 0 && (
                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2 mr-2">
                      {task.assignee.map((assignee) => (
                        <Avatar
                          key={assignee.id}
                          className="h-6 w-6 border-2 border-background"
                        >
                          <AvatarFallback>
                            {assignee.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <ArrowUpCircle className={`h-4 w-4 mr-1 `} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {task.priority}
                    </span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {task.dueDate}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};
