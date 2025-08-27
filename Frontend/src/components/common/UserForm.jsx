import { useForm } from "react-hook-form";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";

const UserForm = ({
  initialValues,
  options,
  onSubmit,
  previewImage,
  handleImageChange,
  getImageName
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const selectGender = watch("gender");
  const selectStatus = watch("status");
  
  useEffect(() => {
    if (initialValues) {
      reset(initialValues); // reset form fields
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 text-center">
        <img
          src={previewImage || "/girl.jpeg"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
        <Form.Group className="mb-3">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First Name"
            {...register("fname", { required: "First name is required" })}
          />
          {errors.fname && (
            <p className="text-red-500">{errors.fname.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last Name"
            {...register("lname", { required: "Last Name is required" })}
          />
          {errors.lname && (
            <p className="text-red-500">{errors.lname.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid Email Address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10 digit number",
              },
            })}
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}
        </Form.Group>

        {/* Gender */}
        <div className="flex flex-col">
          <label>Select your Gender </label>
          <Form.Check
            type="radio"
            label="Female"
            value="female"
            {...register("gender", { required: "Gender is required" })}
            checked={selectGender == "female"}
          />
          <Form.Check
            type="radio"
            label="Male"
            value="male"
            {...register("gender", { required: "Gender is required" })}
            checked={selectGender == "male"}
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        {/* status */}
        <div className="flex flex-col">
          <label>Select your Status</label>
          <Select
            options={options}
            value={options?.find((opt) => opt.value === selectStatus)}
            onChange={(val) => setValue("status", val.value)}
          />
        </div>

        {/* profile */}
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
           <div className="relative">
            <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              register("profile").onChange(e);
              handleImageChange(e);
            }}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <input
            type="text"
            value={getImageName()} // show file name
            readOnly
            className="border p-2 w-full rounded"
          />
           </div>
        </Form.Group>
       

        {/* location */}
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your loaction"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </Form.Group>
      </div>
      <Button type="submit" className="w-full mt-3">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;


