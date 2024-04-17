export type TaskTypes = {
  task_id?: number;
  task_name: string;
  is_completed?: boolean;
  created_at?: string;
};

export interface TaskDataInterface extends DataResponseInterface {
  data: TaskTypes[];
}

export interface DataResponseInterface {
  status: number;
  data: any;
  message: string;
  error: boolean;
}
