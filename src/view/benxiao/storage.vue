<template>
  <div>
    <Card shadow title='存储列表'>
      <template #extra>
        <Row>
          <Button type="success" @click="storageAction('create')">新建存储</Button>
        </Row>
      </template>
      <Modal
        v-model='showStorageCreate'
        @on-ok='storage_ok'
        @on-cancel='storage_cancel'
        title='新建存储'
      >
        <Form
          ref='storageForm'
          :model='storageForm'
          :rules='storageRule'
          :label-width='100'
        >
          <FormItem label='存储名称：' prop='name'>
            <Input v-model='storageForm.name' style='width: 300px'></Input>
          </FormItem>
        </Form>
      </Modal>
      <Drawer :closable="false" v-model="showStorageUser" :width="30">
        <Row class="custom-drawer-header">
          <Col span="4">
            <h2>用户管理</h2>
          </Col>
          <Col span="2" offset="18">
          <Button
            type='primary'
            @click="userAction('create', row)"
            >添加用户</Button
          >
          </Col>
        </Row>
        <Divider/>
        <Table :columns='userColumns' :data='userList'>
          <template slot-scope='{ row }' slot='action'>
          <!-- <Col span='12'>
            <Button type='warning' size='small' @click="userAction('edit', row)"
              >修改</Button>
          </Col> -->
          <Col>
            <Button
              type='error'
              size='small'
              @click="userAction('delete', row)"
              >删除</Button
            >
          </Col>
        </template>
        </Table>

        <Modal
          v-model='showStorageUserAdd'
          @on-ok='user_ok'
          @on-cancel='user_cancel'
          title='添加用户'
        >
        <Form
          ref='userForm'
          :model='userForm'
          :rules='userForm'
          :label-width='100'
        >
          <FormItem label='用户名' prop='name'>
            <Input v-model='userForm.name' style='width: 150px'></Input>
          </FormItem>
          <FormItem label='角色' prop='user'>
            <Select v-model="userForm.role" style="width:150px">
              <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </Drawer>
      <Table :columns='storageColumns' :data='storageList'>
        <template slot-scope='{ row }' slot='usage'>
          {{row.size}} / {{row.quota}}
        </template>
        <template slot-scope='{ row }' slot='action'>
          <Col span='12'>
            <Button type='info' size='small' @click="userAction('list', row)"
              >用户管理</Button>
          </Col>
          <Col span='12'>
            <Button
              type='warning'
              size='small'
              disabled
              @click="storageAction('extend', row)"
              >扩容</Button
            >
          </Col>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import {
  getStorageList,
  getStorageUserList,
  addStorageUser,
  deleteStorageUser,
  createStorage
} from '@/api/data'

export default {
  name: 'storage',
  data () {
    return {
      showStorageCreate: false,
      showStorageUser: false,
      showStorageUserAdd: false,
      storage_action: '',
      user_action: '',
      user_storage: '',
      storageForm: {
        name: ''
      },
      storageRule: {
        name: [
          { required: true, message: '存储名称不能为空', trigger: 'blur' }
        ]
      },
      userForm: {
        name: '',
        role: ''
      },
      userRule: {
        name: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ]
      },
      roleList: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'ReadOnly',
          value: 'readonly'
        },
        {
          label: 'ReadWrite',
          value: 'readwrite'
        }
      ],
      storageColumns: [
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '文件数',
          align: 'center',
          key: 'files'
        },
        {
          title: '存储占用',
          align: 'center',
          slot: 'usage'
        },
        {
          title: '用户角色',
          align: 'center',
          key: 'role'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'createdAt'
        },
        {
          title: '操作',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      userColumns: [
        {
          title: '用户',
          align: 'center',
          key: 'name'
        },
        {
          title: '角色',
          align: 'center',
          key: 'role'
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action'
        }
      ],
      storageList: [],
      userList: []
    }
  },
  methods: {
    storage_ok () {
      let _this = this
      if (this.storage_action === 'create') {
        createStorage(this.storageForm.name)
          .then(() => {
            return getStorageList()
          })
          .then(res => {
            _this.storageList = res
            _this.$Message.info('创建成功')
          })
      }
    },
    storage_cancel () {
      this.formdataReset()
    },
    user_ok () {
      let _this = this
      if (this.user_action === 'create') {
        addStorageUser(this.user_storage, this.userForm)
          .then(() => {
            return getStorageUserList(this.user_storage)
          })
          .then(res => {
            _this.userList = res
            // 初始化数据
            _this.$Message.info('添加成功')
          })
      }
    },
    user_cancel () {
      this.formdataReset()
    },
    formdataReset () {
      this.storageForm = {
        name: ''
      }
      this.userForm = {
        bucket: '',
        name: '',
        user: ''
      }
    },
    storageAction (action, data) {
      this.formdataReset()
      this.storage_action = action
      if (action === 'create') {
        this.showStorageCreate = true
        this.storageForm = {
          name: data.name
        }
      }
    },
    userAction (action, data) {
      this.formdataReset()
      this.user_action = action
      if (action === 'create') {
        this.showStorageUserAdd = true
        return
      }
      if (action === 'list') {
        getStorageUserList(data.name).then(res => {
          this.userList = res
          this.user_storage = data.name
        })
        this.showStorageUser = true
        return
      }
      if (action === 'delete') {
        deleteStorageUser(this.user_storage, data).then(
          getStorageUserList(this.user_storage).then(res => {
            this.userList = res
          })
        )
      }
    }
  },
  created () {
    getStorageList().then(res => {
      this.storageList = res
    })
  }
}
</script>
