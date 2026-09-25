# OASis Server

## 项目结构

```plaintext
server/
├── cmd/
│   └── oasis/
│       └── main.go            # 只负责组装：读配置、连库、注册路由、启动
├── configs/
│   ├── config.yaml            # 开发默认配置
│   └── config.example.yaml
├── migrations/                # SQL 迁移（golang-migrate / goose）
│   └── 0001_init.sql
├── internal/                  # 业务代码，外部不能 import
│   ├── config/                # 配置加载（viper 或自己读 yaml）
│   ├── server/                # Gin Engine、优雅退出
│   ├── router/                # 路由注册（按模块拆）
│   ├── middleware/            # JWT、CORS、RBAC、日志、限流
│   ├── handler/               # HTTP 入参校验 + 调 service
│   │   ├── auth.go
│   │   ├── user.go
│   │   ├── org.go
│   │   ├── workflow.go
│   │   └── task.go
│   ├── service/               # 业务逻辑（审批流转、权限判断）
│   │   ├── auth.go
│   │   ├── user.go
│   │   ├── workflow.go
│   │   └── task.go
│   ├── repository/            # PostgreSQL / Redis / RabbitMQ
│   │   ├── user.go
│   │   ├── workflow.go
│   │   └── redis.go
│   ├── model/                 # 表结构 / 领域对象
│   ├── dto/                   # 请求、响应 JSON
│   └── pkg/                   # 仅本服务用的工具：jwt、hash、分页、错误码
├── pkg/                       # 真正可被外部复用的库（初期可空着）
├── scripts/                   # 一次性脚本
├── go.mod
└── go.sum
```