import json

config_values = None

with open("deploy-conf.json", "r") as conf:
    config_values = json.load(conf)["env"]

out_yml = ""

with open("prod-compose.yml.tpl") as in_conf:
    in_conf_str = in_conf.read()

    for key in config_values.keys():
        in_conf_str = in_conf_str.replace(f"<{key}>", str(config_values[key]))

    out_yml = in_conf_str

with open("prod-compose.yml", "w+") as out_com:
    out_com.write(out_yml)