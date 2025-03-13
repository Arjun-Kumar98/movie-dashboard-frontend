export interface MovieFormData {
    title: string;
    publishingYear: number;
    posterFile?:FileList | any; // Accepts FileList or empty; validated via schema
  }
  
  export interface MovieFormProps {
    mode: 'add' | 'edit';
    initialValues?: MovieFormData & { posterUrl?: string };
    onSubmit: (data: MovieFormData) => void;
  }
  