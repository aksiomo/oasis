package config

import (
	"fmt"
	"os"

	"github.com/goccy/go-yaml"
)

type Config struct {
	HTTP HTTPConfig `yaml:"http"`
}

type HTTPConfig struct {
	Addr string `yaml:"addr"`
	Mode string `yaml:"mode"`
}

type ConfigProvider struct {
	cfg Config
}

func Load(path string) (*ConfigProvider, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read config %s: %w", path, err)
	}

	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("unmarshal config %s: %w", path, err)
	}

	return &ConfigProvider{cfg: cfg}, nil
}

func (p *ConfigProvider) Config() Config {
	return p.cfg
}
