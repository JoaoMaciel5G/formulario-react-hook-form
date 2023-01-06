import { useForm } from 'react-hook-form'
import './App.css'
import formLogo from "./assets/form-logo.png"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function App() {
  const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
    passwd: yup.string().min(8, "A senha deve ter pelo menos 8 digitos").required("A senha é obrigatória"),
    confirmPasswd: yup.string().required("Confirmar a senha é obrigatório").oneOf([yup.ref("passwd")], "As senhas devem ser iguais")
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(userData){
    console.log(userData)
  }
  console.log(errors)
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={formLogo} alt="form-logo" id='img'/>
        </div>
        <div className="box-input">
          <label htmlFor="name">Nome</label>
          <input className="input" type="text" id="name" {...register("name", { required: true })}/>
          <span>{errors && errors.name?.message}</span>
        </div>
        <div className="box-input">
          <label htmlFor="email">Email</label>
          <input className="input" type="text" id="email" {...register("email",{ required: true })}/>
          <span>{errors && errors.email?.message}</span>
        </div>
        <div className="box-input">
          <label htmlFor="passwd">Senha</label>
          <input className="input" type="password" id="passwd" {...register("passwd", { required: true })}/>
          <span>{errors && errors.passwd?.message}</span>
        </div>
        <div className="box-input">
          <label htmlFor="confirm-passwd">Confirmar senha</label>
          <input className="input" type="password" id="confirmPasswd" {...register("confirmPasswd", { required: true })}/>
          <span>{errors && errors.confirmPasswd?.message}</span>
        </div>
        <div>
          <button id="btn">Cadastrar-se</button>
        </div>
      </form>
    </div>
  )
}

export default App
