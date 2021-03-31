from django.db.models.signals import post_save
from django.contrib.auth.models import User

from .models import Memberuser

def member_profile(sender, instance, created, **kwargs):
	if created:
		Memberuser.objects.create(
			user=instance,
			username=instance.username,
			user_id = instance.id,
			memberpassword = instance.password,
			)
		print('Profile created!')

post_save.connect(member_profile, sender=User)