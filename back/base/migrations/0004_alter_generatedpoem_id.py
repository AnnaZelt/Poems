# Generated by Django 4.0.10 on 2024-03-01 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_input_id_generatedpoem_input_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generatedpoem',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]