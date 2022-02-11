import axios, { post, put, get } from 'axios'
import { Notify } from 'quasar'

export class Timesheet {
  
  static async get (payperiod) {
    try {
      // const url = `timesheet?page=${paginate.page}&limit=${paginate.rowsPerPage}&filter=${paginate.filter}`
      console.log("YAYY",payperiod.id)
      const url = `timesheet/${payperiod.id}`

      const { status, data } = await get(url)
        
      if (status >= 200 && status <= 300) {
        return data
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }

  static async getWeek (today) {
    try {
      // const url = `timesheet?page=${paginate.page}&limit=${paginate.rowsPerPage}&filter=${paginate.filter}`
      const url = `timesheet/week/${today}`

      const { status, data } = await get(url)
        
      if (status >= 200 && status <= 300) {
        return data
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }

  static async getPayPeriods (paginate) {
    try {
      const url = `admin/payperiods`

      const { status, data } = await get(url)
        
      if (status >= 200 && status <= 300) {
        return data
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }

  static async add(hour) {
    try {
      const url = `timesheet`

      const { status, data } = hour.id ? await put(url, hour) : await post(url, hour)
        
      if (status >= 200 && status <= 300) {
        return true
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }

  static async remove(hour) {
    try {
      const url = `timesheet/${hour.id}`

      const { status, data } = await axios.delete(url)
        
      if (status >= 200 && status <= 300) {
        return true
      }
      
    } catch (e) {
      //console.log(e)
      //Notify.create({ type: 'negative', message: `Usuário Não Cadastrado!` })
      return false
    }
  }

  
}
