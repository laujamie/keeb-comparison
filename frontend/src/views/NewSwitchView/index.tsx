import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { usePostNewSwitch } from '../../queries/switchQueries';
import Seo from '../../components/Seo';

type SwitchInputs = {
  name: string;
  description: string;
  type: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(1),
      },
    },
    header: {
      marginBottom: theme.spacing(1),
    },
  })
);

const NewSwitchView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SwitchInputs>({
    defaultValues: {
      name: '',
      description: '',
      type: '',
    },
  });
  const queryClient = useQueryClient();
  const handleSwitchSubmit = usePostNewSwitch(queryClient);
  const classes = useStyles();

  const onSubmit = (data: SwitchInputs) => {
    handleSwitchSubmit.mutateAsync(data);
    reset();
  };

  return (
    <Card>
      <Seo title="New Switch" />
      <CardContent>
        <Typography variant="h4" component="h1" className={classes.header}>
          New Switch
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={classes.root}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: 'Name is required.' } }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                id="name"
                label="Name"
                fullWidth
                variant="outlined"
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Description is required' },
              maxLength: {
                value: 300,
                message: 'Description has a maximum limit of 300 characters.',
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                id="description"
                label="Description"
                fullWidth
                variant="outlined"
                error={errors.description !== undefined}
                multiline
                helperText={errors.description && errors.description.message}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: 'Type is required.' } }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                id="type"
                label="Type"
                fullWidth
                variant="outlined"
                error={errors.type !== undefined}
                helperText={errors.type && errors.type.message}
                inputRef={ref}
                {...field}
              />
            )}
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewSwitchView;
