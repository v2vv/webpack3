ansible reck -m authorized_key -a "user=root exclusive=true manage_dir=true key='$(< /home/codespace/.ssh/id_rsa.pub)'" -k


`ansible-playbook playbooks.yaml -v ` 