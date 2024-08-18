<template>
  <div>
    <Card shadow title="用户列表">
      <template #extra>
        <Row>
        <Button type="success" @click="userAction('create')">新建用户</Button>
        </Row>
      </template>
      <Modal
        v-model="showUserCreate"
        @on-ok="user_ok"
        @on-cancel="user_cancel"
        title="新建用户"
      >
        <Form
          ref="userForm"
          :model="userForm"
          :rules="userRule"
          :label-width="100"
        >
          <FormItem label="用户名" prop="username">
            <Input
              v-model="userForm.username"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input
              v-model="userForm.nickname"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input
              v-model="userForm.password"
              type="password"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <Input
              v-model="userForm.phone"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input
              v-model="userForm.email"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="头像" prop="avatar">
            <Input
              v-model="userForm.avatar"
              style="width: 300px"
            ></Input>
          </FormItem>
        </Form>
      </Modal>
      <Table border :columns="userColumns" :data="userList.items">
        <template slot-scope="{ row, index }" slot="status">
          <Row type="flex" justify="space-around">
            <Tag color="error" v-if=row.locked>锁定</Tag>
            <Tag color="green" v-else>正常</Tag>
          </Row>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Row type="flex" justify="space-around">
            <Col>
              <Button
                v-if="row.locked"
                type="info"
                size="small"
                @click="userAction('unlock', row)"
                >解锁</Button
              >
              <Button
                v-else
                type="error"
                size="small"
                @click="userAction('lock', row)"
                >锁定</Button
              >
            </Col>
            <Col>
              <Button
                type="warning"
                size="small"
                @click="userAction('change', row)"
                >修改密码</Button
              >
            </Col>
          </Row>
        </template>
      </Table>
      <Page :total="userList.total" :page-size="userList.perPage" :current="userList.current" @on-change="userPageChanged" @on-page-size-change="userPageSizeChanged" show-sizer style="margin-top:20px"/>
    </Card>
  </div>
</template>

<script>
import {
  getUserList,
  createUser,
  changePassword
//   // rechargeUser,
//   // userUser,
//   // getProductList,
//   // getTradeList,
//   // getIncomeList
} from '@/api/user'

export default {
  name: 'user',
  data () {
    return {
      showUserCreate: false,
      user_action: '',
      userRule: {
        namename: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      userForm: {
        username: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        avatar: ''
      },
      userColumns: [
        {
          title: 'ID',
          width: 200,
          align: 'center',
          key: 'id'
        },
        {
          title: '状态',
          width: 100,
          align: 'center',
          slot: 'status'
        },
        {
          title: '用户名',
          width: 120,
          align: 'center',
          key: 'username'
        },
        {
          title: '昵称',
          width: 120,
          align: 'center',
          key: 'nickname'
        },
        {
          title: '电话',
          width: 120,
          align: 'center',
          key: 'phone'
        },
        {
          title: '邮箱',
          width: 200,
          align: 'center',
          key: 'email'
        },
        {
          title: '创建时间',
          width: 200,
          align: 'center',
          key: 'createdAt'
        },
        {
          title: '修改时间',
          width: 200,
          align: 'center',
          key: 'updatedAt'
        },
        {
          title: '操作',
          width: 200,
          align: 'center',
          slot: 'action'
        }
      ],
      userList: {
        items: [],
        total: 10,
        page: 1,
        perPage: 10
      },
      recordList: {
        items: [],
        total: 10,
        page: 1,
        perPage: 10
      }
    }
  },
  methods: {
    user_ok () {
      let _this = this
      if (this.user_action === 'create') {
        createUser(this.userForm)
          .then(() => {
            return getUserList({ perPage: this.userList.perPage, page: this.userList.page })
          })
          .then(res => {
            _this.userList = res
            _this.$Message.info('创建成功')
          })
      } else if (this.user_action === 'changePassword') {
        changePassword(this.userForm)
          .then(() => {
            _this.$Message.info('修改成功')
          })
      }
    },
    user_cancel () {
      this.formdataReset()
    },
    formdataReset () {
      this.userForm = {
        username: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        avatar: ''
      }
    },
    userAction (action, data) {
      this.formdataReset()
      this.user_action = action
      if (action === 'create') {
        this.showUserCreate = true
        return
      }
      this.userForm = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        money: data.money,
        introducer: data.introducer
      }
    },
    userPageChanged (page) {
      this.userList.page = page
      getUserList({ perPage: this.userList.perPage, page: this.userList.page }).then(res => {
        this.userList = res
      })
    },
    userPageSizeChanged (size) {
      this.userList.page = 1
      this.userList.perPage = size
      getUserList({ perPage: this.userList.perPage, page: this.userList.page }).then(res => {
        this.userList = res
      })
    }
  },
  created () {
    getUserList({ perPage: this.userList.perPage, page: this.userList.page }).then(res => {
      this.userList = res
    })
  }
}
</script>
